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
                        show: auth('task:Create'),
                    }
                }
            },
            rowHandle: {
                //固定右侧
                fixed: 'right',
                width: 200,
                buttons: {
                    view: {
                        show: false,
                    },
                    edit: {
                        iconRight: 'Edit',
                        type: 'text',
                        show: auth('task:Update')
                    },
                    remove: {
                        iconRight: 'Delete',
                        type: 'text',
                        show: auth('task:Delete')
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
                _index: {
                    title: '序号',
                    form: {show: false},
                    column: {
                        type: 'index',
                        align: 'center',
                        width: '70px',
                        columnSetDisabled: true, //禁止在列设置中选择
                    },
                },
                title: {
                    title: '任务标题',
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
                            {required: true, message: '标题必填项'},
                        ],
                        component: {
                            placeholder: '请输入标题',
                            props: {
                                clearable: true,
                            },
                        },
                    },
                },
                type: {
                    title: '任务类型',
                    sortable: 'custom',
                    search: {
                        disabled: false,
                    },
                    type: 'dict-select',
                    dict: dict({
                        data: [
                            {
                                label: '设计',
                                value: 1,
                            },
                            {
                                label: '程序',
                                value: 2,
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
                content: {
                    title: '内容',
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
                            placeholder: '请输入任务内容',
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
