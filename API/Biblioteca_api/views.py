from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, generics, filters
from rest_framework.filters import *
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from django_filters.rest_framework import *
from Biblioteca_api.models import *
from Biblioteca_api.serializers import *
from django.contrib.auth.models import User
from Biblioteca_api.permissions import *

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet


from rest_framework import permissions

class UsuarioListView(generics.ListCreateAPIView):
    permission_classes = (UserList,)
    serializer_class = UsuarioList
    name = 'user-list'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['username','email']
    ordering_fields = ['username','email']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        elif self.request.user.id != None:
            return User.objects.filter(id = self.request.user.id)
        else:
            return []

class UsuarioDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (UsuarioDetailPermission,)
    queryset = User.objects.all()
    name = 'user-detail'

    def get_serializer_class(self):
        id = self.kwargs['pk']
        if self.request.user.is_superuser:
            if self.request.user.id == id:
                return UsuarioDetail
            else:
                return UsuarioSuperDetail
        else:
            return UsuarioDetail
 
class Login(generics.ListCreateAPIView):
    permission_classes = (UserList,)
    serializer_class = Login
    name = 'login'

    def get_queryset(self):
        return User.objects.filter(id = self.request.user.id)

###############################################################################################################

class GeneroListView(generics.ListCreateAPIView):
    permission_classes = (GenericListPermission,)
    queryset = Genero.objects.all()
    serializer_class = GeneroList
    name = 'genero-list'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nome']
    ordering_fields = ['nome']

class GeneroDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (GenericDetailPermission,)
    queryset = Genero.objects.all()
    serializer_class = GeneroDetail
    name = 'genero-detail'

###############################################################################################################

class LivroListView(generics.ListCreateAPIView):
    permission_classes = (GenericListPermission,)
    queryset = Livro.objects.all()
    serializer_class = LivroList
    name = 'livro-list'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['titulo', 'genero__nome']
    ordering_fields = ['titulo', 'genero__nome', 'autor', 'editora']

class LivroDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (GenericDetailPermission,)
    queryset = Livro.objects.all()
    serializer_class = LivroDetail
    name = 'livro-detail'

###############################################################################################################

class PrateleiraListView(generics.ListCreateAPIView):
    permission_classes = (GenericListPermission,)
    queryset = Prateleira.objects.all()
    serializer_class = PrateleiraList
    name = 'prateleira-list'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['estante__posicao']
    ordering_fields = ['estante__posicao']

class PrateleiraDetailView(generics.RetrieveDestroyAPIView):
    permission_classes = (GenericDetailPermission,)
    queryset = Prateleira.objects.all()
    serializer_class = PrateleiraDetail
    name = 'prateleira-detail'

###############################################################################################################

class EstanteListView(generics.ListCreateAPIView):
    permission_classes = (GenericListPermission,)
    queryset = Estante.objects.all()
    serializer_class = EstanteList
    name = 'estante-list'
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['genero__nome', 'numero']
    search_fields = ['genero__nome', 'numero']
    ordering_fields = ['genero__nome', 'numero']

class EstanteDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (noDelete,)
    queryset = Estante.objects.all()
    serializer_class = EstanteDetail
    name = 'estante-detail'

###############################################################################################################

class EmprestimoCreateview(generics.ListCreateAPIView):
    permission_classes = (ListPermission,)
    queryset = Emprestimo.objects.all()
    serializer_class = EmprestimoCreate
    name = 'emprestimo-create'

class EmprestimoListView(generics.ListCreateAPIView):
    permission_classes = (ListPermission,)
    serializer_class = EmprestimoList
    name = 'emprestimo-list'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['livro__titulo', 'devolver']
    ordering_fields = ['livro']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Emprestimo.objects.all()
        else:
            return Emprestimo.objects.filter(usuario = self.request.user.id)

class EmprestimoDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (DetailPermission,)
    queryset = Emprestimo.objects.all()
    serializer_class = EmprestimoDetailList
    name = 'emprestimo-detail'

###############################################################################################################

class MultaListView(generics.ListCreateAPIView):
    permission_classes = (noCreate,)
    queryset = Multa.objects.all()
    serializer_class = MultaList
    name = 'multas-list'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['pagar']
    ordering_fields = ['data_pagar']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Multa.objects.all()
        else:
            return Multa.objects.filter(usuario = self.request.user.id)

class MultasDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (DetailPermission,)
    queryset = Multa.objects.all()
    serializer_class = MultaDetail
    name = 'multa-detail'

###############################################################################################################

class Root(generics.GenericAPIView):
    name = 'entidades-list'

    def get(self, request):
        return Response({
            'user' : reverse('user-list', request=request),
            'genero' : reverse('genero-list', request=request),
            'livro': reverse('livro-list',request=request),
            'prateleira': reverse('prateleira-list', request=request),
            'estante': reverse('estante-list', request=request),
            'emprestimo' : reverse('emprestimo-list', request=request),
            'multas' : reverse('multas-list', request=request),
})