<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <importExcel api="api/system/question/" v-auth="'question:Import'">导入</importExcel>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts" setup name="areas">
import {ref, onMounted} from 'vue';
import {useExpose, useFs} from '@fast-crud/fast-crud';
import {createCrudOptions} from './crud';
import importExcel from '/@/components/importExcel/index.vue';

const {crudBinding, crudRef, crudExpose} = useFs({createCrudOptions});
// 页面打开后获取列表数据
onMounted(() => {
  crudExpose.doRefresh();
});
</script>
