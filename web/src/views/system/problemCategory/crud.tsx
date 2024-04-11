import * as api from './api';
import {
    UserPageQuery,
    AddReq,
    DelReq,
    EditReq,
    CreateCrudOptionsProps,
    CreateCrudOptionsRet
} from '@fast-crud/fast-crud';
import {dictionary} from '/@/utils/dictionary';
import {successMessage} from '/@/utils/message';
import {auth} from "/@/utils/authFunction";
import {shallowRef} from "vue";
import tableSelector from "/@/components/tableSelector/index.vue";
import {GetObj} from "./api";

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
                        show: auth('problem_category:Create'),
                    }
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
                        show: auth('problem_category:Update')
                    },
                    remove: {
                        iconRight: 'Delete',
                        show: auth('problem_category:Delete')
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
                    title: 'ID',
                    column: {
                        show: true,
                        align: 'center',
                        width: '70px',
                    },
                    form: {
                        show: false,
                    }
                },
                title: {
                    title: '分类标题',
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
