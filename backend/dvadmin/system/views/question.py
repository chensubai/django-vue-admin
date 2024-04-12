# -*- coding: utf-8 -*-

"""
@Remark: 问题管理
"""
from rest_framework import serializers
from dvadmin.system.models import Question
from dvadmin.utils.serializers import CommonModelSerializer
from dvadmin.utils.viewset import CustomModelViewSet


class QuestionSerializer(CommonModelSerializer):
    """
    字典-序列化器
    """
    delete_datetime = serializers.DateTimeField(allow_null=True, required=False)
    status_label = serializers.SerializerMethodField()
    def get_status_label(self, obj: Question):
        if obj.status:
            return "启用"
        return "禁用"
    class Meta:
        model = Question
        fields = "__all__"





class QuestionCreateUpdateSerializer(CommonModelSerializer):
    """
    问题 创建/更新时的列化器
    """
    title = serializers.CharField(max_length=100)
    delete_datetime = serializers.DateTimeField(allow_null=True, required=False)
    class Meta:
        model = Question
        fields = '__all__'


class QuestionViewSet(CustomModelViewSet):
    """
    问题管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    create_serializer_class = QuestionCreateUpdateSerializer
    extra_filter_class = []
    search_fields = ['title']
