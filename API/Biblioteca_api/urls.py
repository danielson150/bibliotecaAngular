from django.contrib import admin
from django.urls import path
from Biblioteca_api.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework.authtoken.views import ObtainAuthToken

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-login/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', Root.as_view(), name = Root.name),
    path('usuarios/', UsuarioListView.as_view(), name = UsuarioListView.name),
    path('usuarios/<int:pk>', UsuarioDetailView.as_view(), name = UsuarioDetailView.name),
    path('generos/', GeneroListView.as_view(), name = GeneroListView.name),
    path('generos/<int:pk>', GeneroDetailView.as_view(), name = GeneroDetailView.name),
    path('livros/', LivroListView.as_view(), name = LivroListView.name),
    path('livros/<int:pk>', LivroDetailView.as_view(), name = LivroDetailView.name),
    path('prateleiras/', PrateleiraListView.as_view(), name = PrateleiraListView.name),
    path('prateleiras/<int:pk>', PrateleiraDetailView.as_view(), name = PrateleiraDetailView.name),
    path('estantes/', EstanteListView.as_view(), name = EstanteListView.name),
    path('estantes/<int:pk>', EstanteDetailView.as_view(), name = EstanteDetailView.name),
    path('emprestimos/', EmprestimoListView.as_view(), name = EmprestimoListView.name),
    path('emprestimos-create/', EmprestimoCreateview.as_view(), name = EmprestimoCreateview.name),
    path('emprestimos/<int:pk>', EmprestimoDetailView.as_view(), name = EmprestimoDetailView.name),
    path('multas/', MultaListView.as_view(), name = MultaListView.name),
    path('multas/<int:pk>', MultasDetailView.as_view(), name = MultasDetailView.name),

    path('usuario-logado/', Login.as_view(), name = Login.name),

] 
