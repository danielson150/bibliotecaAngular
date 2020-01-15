from rest_framework import permissions
from django.contrib.auth.models import User
from Biblioteca_api.models import *

class noCreate(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        if request.method == 'POST':
            return False

class noDelete(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        if request.method == 'PATH':
            if request.user.is_superuser:
                return True
        if request.method == 'DELETE':
            return False

class GenericListPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        if request.method == 'POST':
            if request.user.is_superuser:
                return True

class GenericDetailPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        if request.method == 'PUT':
            if request.user.is_superuser:
                return True
        if request.method == 'DELETE':
            if request.user.is_superuser:
                return True

class UsuarioDetailPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            if request.user.is_superuser:
                return True
            if view.kwargs['pk'] == request.user.id:
                return True
        if request.method == 'PUT':
            if request.user.is_superuser:
                return True
            if view.kwargs['pk'] == request.user.id:
                return True
        if request.method == 'DELETE':
            if request.user.is_superuser:
                return True
            if view.kwargs['pk'] == request.user.id:
                return True

class UserList(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        if request.method == 'POST':
            if request.user.id == None:
                return True

class ListPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            if request.user.id != None:
                return True
        if request.method == 'POST':
            if request.user.is_superuser:
                return True
            
class DetailPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            if request.user.is_superuser:
                return True
        if request.method == 'PUT':
            if request.user.is_superuser:
                return True

