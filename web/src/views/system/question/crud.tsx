import * as api from './api';
import {
    dict,
    UserPageQuery,
    AddReq,
    DelReq,
    EditReq,
    compute,
    CreateCrudOptionsProps,
    CreateCrudOptionsRet
} from '@fast-crud/fast-crud';
import {dictionary} from '/@/utils/dictionary';
import {successMessage} from '/@/utils/message';
import {auth} from "/@/utils/authFunction";
import {shallowRef} from "vue";
import tableSelector from "/@/components/tableSelector/index.vue";
import {exportData, GetObj, UpdateStatusObj} from "./api";

export const createCrudOptions = function ({crudExpose}: CreateCrudOptionsProps): CreateCrudOptionsRet {
    const pageRequest = async (query: UserPageQuery) => {
        return await api.GetList(query);
    };
    const editRequest = async ({form, row}: EditReq) => {
        form.id = row.id;
        return await api.UpdateObj(form);
    };
    const delRequest = async ({row}: DelReq) => {
        return await api.DelObj(row.id);
    };
    const addRequest = async ({form}: AddReq) => {
        return await api.AddObj(form);
    };
    const exportRequest = async (query: UserPageQuery) => {
        return await api.exportData(query);
    };


    /**
     * 懒加载
     * @param row
     * @returns {Promise<unknown>}
     */
    const loadContentMethod = (tree: any, treeNode: any, resolve: Function) => {
        pageRequest({pcode: tree.code}).then((res: APIResponseData) => {
            resolve(res.data);
        });
    };

    return {
        crudOptions: {
            request: {
                pageRequest,
                addRequest,
                editRequest,
                delRequest,
            },
            actionbar: {
                buttons: {
                    add: {
                        show: auth('question:Create'),
                    },
                    export: {
						text: '导出', //按钮文字
						title: '导出', //鼠标停留显示的信息
						show: auth('question:Export'),
						click() {
							return exportRequest(crudExpose!.getSearchFormData());
						},
					},
                }
            },
            rowHandle: {
                //固定右侧
                fixed: 'right',
                width: 200,
                buttons: {
                    view: {
                        show: true,
                    },
                    edit: {
                        iconRight: 'Edit',
                        show: auth('question:Update')
                    },
                    remove: {
                        iconRight: 'Delete',
                        show: auth('question:Delete')
                    },
                },
            },
            pagination: {
                show: true,
            },
            table: {
                rowKey: 'id',
                lazy: true,
                load: loadContentMethod,
            },
            columns: {
                id: {
                    title: '序号',
                    form: {show: false},
                    column: {
                        show:true,
                        align: 'center',
                        width: '70px',
                        columnSetDisabled: true, //禁止在列设置中选择
                    },
                },
                title: {
                    title: '问题标题',
                    search: {
                        show: true,
                    },
                    type: 'input',
                    column: {
                        minWidth: 120,
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {required: true, message: '问题标题必填项'},
                        ],
                        component: {
                            placeholder: '请输入问题标题',
                            props: {
                                clearable: true,
                            },
                        },
                    },
                },
                category_id: {
                    title: '问题所属',
                    search: {
                        disabled: true,
                    },
                    type: 'dict-select',
                    dict: dict({
                        url: '/api/system/problem_category/all_category',
                        value: 'id',
                        label: 'title',
                    }),
                    column: {
                        minWidth: 100, //最小列宽
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: '必填项',
                            },
                        ],
                        component: {
                            multiple: true,
                            filterable: true,
                            placeholder: '请选择问题所属',
                        },
                    },
                },
                option_a: {
                    title: '选项A',
                    search: {
                        show: true,
                    },
                    type: 'input',
                    column: {
                        minWidth: 120,
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {required: true, message: '选项A必填项'},
                        ],
                        component: {
                            placeholder: '请输入选项A',
                            props: {
                                clearable: true,
                            },
                        },
                    },
                },
                option_b: {
                    title: '选项B',
                    search: {
                        show: true,
                    },
                    type: 'input',
                    column: {
                        minWidth: 120,
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {required: true, message: '选项B必填项'},
                        ],
                        component: {
                            placeholder: '请输入选项B',
                            props: {
                                clearable: true,
                            },
                        },
                    },
                },
                option_c: {
                    title: '选项C',
                    search: {
                        show: true,
                    },
                    type: 'input',
                    column: {
                        minWidth: 120,
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            // {required: true, message: '问题标题必填项'},
                        ],
                        component: {
                            placeholder: '请输入选项C',
                            props: {
                                clearable: true,
                            },
                        },
                    },
                },
                option_d: {
                    title: '选项D',
                    search: {
                        show: true,
                    },
                    type: 'input',
                    column: {
                        minWidth: 120,
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            // {required: true, message: '选项D必填项'},
                        ],
                        component: {
                            placeholder: '请输入选项D',
                            props: {
                                clearable: true,
                            },
                        },
                    },
                },
                type: {
                    title: '问题类型',
                    sortable: 'custom',
                    search: {
                        disabled: false,
                    },
                    type: 'dict-select',
                    dict: dict({
                        data: [
                            {
                                label: '单选题',
                                value: 1,
                            },
                            {
                                label: '多选题',
                                value: 2,
                            },
                             {
                                label: '判断题',
                                value: 3,
                            },
                             {
                                label: '设计题',
                                value: 4,
                            },
                        ],
                    }),
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: '必填项',
                            },
                        ],
                        component: {
                            span: 12,
                        },
                        itemProps: {
                            class: {yxtInput: true},
                        },
                    },
                },
                answer: {
                    title: '答案',
                    sortable: 'custom',
                    search: {
                        disabled: false,
                    },
                    type: 'dict-select',
                    dict: dict({
                        data: [
                            {
                                label: 'A',
                                value: 1,
                            },
                            {
                                label: 'B',
                                value: 2,
                            },
                             {
                                label: 'C',
                                value: 3,
                            },
                             {
                                label: 'D',
                                value: 4,
                            },
                        ],
                    }),
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: '必填项',
                            },
                        ],
                        component: {
                            span: 12,
                        },
                        itemProps: {
                            class: {yxtInput: true},
                        },
                    },
                },
                analysis: {
                    title: '解析',
                    column: {
                        show: false,
                    },
                    type: ['editor-wang5', 'colspan'],
                    form: {
                        rules: [
                            // 表单校验规则
                            {required: true, message: '内容必填项'},
                        ],

                        component: {
                            placeholder: '请输入解析',
                        },
                    },
                },
                status: {
                    title: '是否启用',
                    search: {
                        show: true,
                    },
                    type: 'dict-radio',
                    column: {
                        minWidth: 90,
                        component: {
                            name: 'fs-dict-switch',
                            activeText: '',
                            inactiveText: '',
                            style: '--el-switch-on-color: var(--el-color-primary); --el-switch-off-color: #dcdfe6',
                            onChange: compute((context) => {
                                return () => {
                                    api.UpdateObj(context.row).then((res: APIResponseData) => {
                                        successMessage(res.msg as string);
                                    });
                                };
                            }),
                        },
                    },
                    dict: dict({
                        data: dictionary('button_status_bool'),
                    }),
                },
                create_datetime: {
                    title: '创建时间',
                    column: {
                        show: true,
                    },
                    form: {
                        show: false,
                    }
                },
                update_datetime: {
                    title: '修改时间',
                    column: {
                        show: true,
                    },
                    form: {
                        show: false,
                    }
                }
            },
        },
    };
};
