# -*- coding: utf-8 -*-
from rest_framework import serializers
from rest_framework.views import APIView

from application import dispatch
from dvadmin.system.models import ProblemCategory
from dvadmin.utils.json_response import SuccessResponse
from dvadmin.utils.serializers import CommonModelSerializer
from dvadmin.utils.viewset import CustomModelViewSet


class ProblemCategorySerializer(CommonModelSerializer):
    """
    字典-序列化器
    """
    class Meta:
        model = ProblemCategory
        fields = "__all__"
        read_only_fields = ["id"]





class ProblemCategoryCreateUpdateSerializer(CommonModelSerializer):
    """
    问题分类 创建/更新时的列化器
    """
    title = serializers.CharField(max_length=100)

    class Meta:
        model = ProblemCategory
        fields = '__all__'


class ProblemCategoryViewSet(CustomModelViewSet):
    """
    问题分类管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = ProblemCategory.objects.all()
    serializer_class = ProblemCategorySerializer
    create_serializer_class = ProblemCategoryCreateUpdateSerializer
    extra_filter_class = []
    search_fields = ['title']
