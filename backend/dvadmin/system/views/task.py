# -*- coding: utf-8 -*-

"""
@author: 猿小天
@contact: QQ:1638245306
@Created on: 2021/6/3 003 0:30
@Remark: 字典管理
"""
from rest_framework import serializers
from dvadmin.system.models import Task
from dvadmin.utils.serializers import CommonModelSerializer
from dvadmin.utils.viewset import CustomModelViewSet


class TaskSerializer(CommonModelSerializer):
    """
    字典-序列化器
    """
    delete_datetime = serializers.DateTimeField(allow_null=True, required=False)
    status_label = serializers.SerializerMethodField()
    def get_status_label(self, obj: Task):
        if obj.status:
            return "启用"
        return "禁用"
    class Meta:
        model = Task
        fields = "__all__"





class TaskCreateUpdateSerializer(CommonModelSerializer):
    """
    任务 创建/更新时的列化器
    """
    title = serializers.CharField(max_length=100)
    delete_datetime = serializers.DateTimeField(allow_null=True, required=False)
    class Meta:
        model = Task
        fields = '__all__'


class TaskViewSet(CustomModelViewSet):
    """
    任务管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    create_serializer_class = TaskCreateUpdateSerializer
    extra_filter_class = []
    search_fields = ['title']
