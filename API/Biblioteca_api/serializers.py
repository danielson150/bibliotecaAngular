from rest_framework import serializers
from django.contrib.auth.models import User
from Biblioteca_api.models import *
from datetime import date
import datetime



###############################################################################################################

class UsuarioList(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'email', 'username', 'first_name', 'password', 'url')

    def validate(self, data):
        if User.objects.filter(username=data['username']).exists():
            usuario = User.objects.get(username=data['username'])
            if not usuario.is_active:
                usuario.delete()
            else:
                raise serializers.ValidationError("Nome de usuário já cadastrado")
        elif User.objects.filter(email=data['email']).exists():
            usuario = User.objects.get(email=data['email'])
            if not usuario.is_active:
                usuario.delete()
            else:
                raise serializers.ValidationError("Email já cadastrado")
        return data

    def create(self, validated_data):
        user = super(UsuarioList, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.is_staff = True
        user.first_name = validated_data['first_name']
        if not User.objects.filter(is_superuser = True).exists():
            user.is_superuser = True
        else:
             user.is_superuser = False
        user.save()
        return user

class UsuarioDetail(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'email', 'username', 'first_name', 'password', 'url')

    def update(self, instance, validated_data):
        if User.objects.filter(username=validated_data['username']).exists():
            usuario = User.objects.get(username=validated_data['username'])
            if not usuario.is_active:
                usuario.delete()
            else:
                if instance.username != validated_data['username']:
                    raise serializers.ValidationError("Nome de usuário já cadastrado")
        elif User.objects.filter(email=validated_data['email']).exists():
            usuario = User.objects.get(email=validated_data['email'])
            if not usuario.is_active:
                usuario.delete()
            else:
                if instance.email != validated_data['email']:
                    raise serializers.ValidationError("Email já cadastrado")

        if instance.password != validated_data['password']:
            instance.set_password(validated_data['password'])
        if instance.email != validated_data['email']:
            instance.email = validated_data.get('email', instance.email)
        if instance.username != validated_data['username']:
            instance.username = validated_data.get('username', instance.username)

        instance.save()
        return instance

class UsuarioSuperDetail(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'first_name', 'is_active')
    
    def update(self, instance, validated_data):
        if instance.is_active != validated_data['is_active']:
            instance.is_active = validated_data['is_active']
            instance.save()
        return instance

class Login(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'first_name', 'is_active', 'is_superuser')

###############################################################################################################

class GeneroList(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Genero
        fields = ('pk', 'nome', 'descricao', 'url')

    def validate(self, data):
        if Genero.objects.filter(nome=data['nome']).exists():
            raise serializers.ValidationError("Gênero já cadastrado")
        return data

class GeneroDetail(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Genero
        fields = ('pk', 'nome', 'descricao')

    def update(self, instance, validated_data):
        if Genero.objects.filter(nome=validated_data['nome']).exists():
            if instance.nome != validated_data['nome']:
                raise serializers.ValidationError("Gênero já cadastrado")
        
        if instance.nome != validated_data['nome']:
            instance.nome = validated_data.get('nome', instance.nome)

        if instance.descricao != validated_data['descricao']:
            instance.descricao = validated_data.get('descricao', instance.descricao)
            
        instance.save()
        return instance     

###############################################################################################################

class LivroList(serializers.HyperlinkedModelSerializer):
    genero = serializers.SlugRelatedField(queryset=Genero.objects.all(), slug_field='nome')
    class Meta:
        model = Livro
        fields = ('pk', 'titulo', 'genero', 'autor', 'editora', 'ano_lancamento', 'quantidade', 'url')

    def validate(self, data):
        if Livro.objects.filter(genero=data['genero'], titulo = data['titulo'], editora = data['editora'], autor = data['autor'], ano_lancamento = data['ano_lancamento']).exists():
            raise serializers.ValidationError("Livro já cadastrado")
        elif data['quantidade'] < 0:
            raise serializers.ValidationError("A quantidade de livro não pode ser menor que zero")
        return data

    def create(self, validated_data):
        if Estante.objects.filter(genero = validated_data['genero']).exists():
           estantes = Estante.objects.filter(genero = validated_data['genero'])
           for estante in estantes:
                if estante.prateleiras.filter(espaco_sobrando__gt = 0).exists():
                    prateleira = estante.prateleiras.filter(espaco_sobrando__gt = 0)[0] 
                    livro = Livro.objects.create(genero=validated_data['genero'], titulo = validated_data['titulo'],
                    editora = validated_data['editora'], autor = validated_data['autor'], ano_lancamento = validated_data['ano_lancamento'],
                    quantidade = validated_data['quantidade'],estante = estante, prateleira = prateleira)
                    prateleira.espaco_sobrando -= 1
                    livro.save()
                    prateleira.save()
                    return livro
                else:
                    raise serializers.ValidationError("Não há espaço nas prateleiras, providencie uma nova")
        else:
            raise serializers.ValidationError("Não existe uma Estante com este genero")

class LivroDetail(serializers.HyperlinkedModelSerializer):
    genero = serializers.SlugRelatedField(queryset=Genero.objects.all(), slug_field='nome')
    class Meta:
        model = Livro
        fields = ('pk', 'estante', 'prateleira', 'titulo', 'genero', 'autor', 'editora', 'ano_lancamento', 'quantidade')

    def validate(self, data):
        
        return data

    def update(self, instance, validated_data):
        
        if instance.genero != validated_data['genero'] and instance.titulo != validated_data['titulo'] and instance.editora != validated_data['editora']  and instance.autor != validated_data['autor'] and instance.ano_lancamento != validated_data['ano_lancamento']:
            if Livro.objects.filter(genero=validated_data['genero'], titulo = validated_data['titulo'],
            editora = validated_data['editora'], autor = validated_data['autor'],
            ano_lancamento = validated_data['ano_lancamento']).exists():

                raise serializers.ValidationError("Livro já cadastrado")

            elif data['quantidade'] < 0:

                raise serializers.ValidationError("A quantidade de livro não pode ser menor que zero")

        if Estante.objects.filter(genero = validated_data['genero']).exists():
           estantes = Estante.objects.filter(genero = validated_data['genero'])
           for estante in estantes:
                if estante.prateleiras.filter(espaco_sobrando__gt = 0).exists():
                    prateleira = estante.prateleiras.filter(espaco_sobrando__gt = 0)[0] 
                    if instance.genero != validated_data['genero']:
                        instance.genero = validated_data.get('genero', instance.genero)
                                    
                    if instance.titulo != validated_data['titulo']:
                        instance.titulo = validated_data.get('titulo', instance.titulo)
                        
                    if instance.autor != validated_data['autor']:
                        instance.autor = validated_data.get('autor', instance.autor)
                                
                    if instance.editora != validated_data['editora']:
                        instance.editora = validated_data.get('editora', instance.editora)

                    if instance.ano_lancamento != validated_data['ano_lancamento']:
                        instance.ano_lancamento = validated_data.get('ano_lancamento', instance.ano_lancamento)

                    if instance.quantidade != validated_data['quantidade']:
                        instance.quantidade = validated_data.get('quantidade', instance.quantidade)

                    instance.estante = estante
                    instance.prateleira = prateleira

                    instance.save()
                    return instance
                else:
                    raise serializers.ValidationError("Não há espaço nas prateleiras, providencie uma nova")
        else:
            raise serializers.ValidationError("Não existe uma Estante com este genero")

###############################################################################################################

class PrateleiraList(serializers.HyperlinkedModelSerializer):
    estante = serializers.SlugRelatedField(queryset=Estante.objects.all(), slug_field='id')
    class Meta:
        model = Prateleira
        fields = ('pk', 'estante', 'url')

    def create(self, validated_data):
        if  Estante.objects.filter(id = validated_data['estante'].id, espaco_sobrando__gte = 1).exists():
            estante = Estante.objects.get(id = validated_data['estante'].id)
            posicao = len(estante.prateleiras.all()) + 1
            prateleira = Prateleira.objects.create(posicao = posicao, estante = validated_data['estante'], espaco_sobrando = 10 )
            estante.espaco_sobrando -= 1
            prateleira.save()
            estante.save()
            return prateleira
        else:
            raise serializers.ValidationError('Não existe espaço sobrando nesta estante para novas prateleiras')    

class PrateleiraDetail(serializers.HyperlinkedModelSerializer):
    estante = serializers.SlugRelatedField(queryset=Estante.objects.all(), slug_field='numero')
    class Meta:
        model = Prateleira
        fields = ('pk', 'estante','posicao')

###############################################################################################################

class EstanteList(serializers.HyperlinkedModelSerializer):
    genero = serializers.SlugRelatedField(queryset=Genero.objects.all(), slug_field='nome')
    class Meta:
        model = Estante
        fields = ('pk', 'genero', 'espaco_sobrando', 'url')

    def create(self, validated_data):
        genero = Genero.objects.get(id = validated_data['genero'].id)
        numero = len(genero.estantes_genero.all()) + 1
        estante = Estante.objects.create(genero = validated_data['genero'],
        espaco_sobrando = validated_data['espaco_sobrando'], numero = numero)
        return estante

class EstanteDetail(serializers.HyperlinkedModelSerializer):
    genero = serializers.SlugRelatedField(queryset=Genero.objects.all(), slug_field='nome')
    class Meta:
        model = Estante
        fields = ('pk', 'numero', 'genero')

###############################################################################################################

class EmprestimoCreate(serializers.HyperlinkedModelSerializer):
    usuario = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    livro = serializers.SlugRelatedField(queryset=Livro.objects.all(), slug_field='titulo')
    class Meta:
        model = Emprestimo
        fields = ('pk', 'usuario', 'livro', 'url')

    def create(self, data):
        if  not Multa.objects.filter(pagar = False, usuario = data['usuario'].id).exists():
            if  len(Emprestimo.objects.filter(usuario = data['usuario'].id, devolver = False)) <= 3:
                if not Emprestimo.objects.filter(usuario = data['usuario'].id, livro = data['livro'].id, devolver = False).exists():
                    livro = Livro.objects.get(id = data['livro'].id)
                    if livro.quantidade > 0:
                        livro.quantidade -= 1
                        data_inicial = date.today()
                        data_final = datetime.date(data_inicial.year,data_inicial.month,data_inicial.day-1)

                        emprestimo = Emprestimo.objects.create(usuario = data['usuario'], livro = data['livro'], 
                        data_inicial = data_inicial, data_final = data_final, data_entrega = None, devolver = False)
                        
                        emprestimo.save()
                        livro.save()
                        return emprestimo
                    else:
                        raise serializers.ValidationError("Quantidade de livro insuficiente")
                else:
                    raise serializers.ValidationError("Este livro ja esta sendo emprestado a este usuário")
            else:
                raise serializers.ValidationError("O usuário chegou ao limite de emprestimos")
        else:
            raise serializers.ValidationError("O usuário tem multas pendentes")

class EmprestimoList(serializers.HyperlinkedModelSerializer):
    usuario = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    livro = serializers.SlugRelatedField(queryset=Livro.objects.all(), slug_field='titulo')
    class Meta:
        model = Emprestimo
        fields = ('pk', 'usuario', 'livro', 'data_inicial', 'data_final', 'data_entrega','devolver', 'url')

class EmprestimoDetailList(serializers.HyperlinkedModelSerializer):
    usuario = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    livro = serializers.SlugRelatedField(queryset=Livro.objects.all(), slug_field='titulo')
    class Meta:
        model = Emprestimo
        fields = ('pk', 'usuario', 'livro', 'data_inicial', 'data_final', 'data_entrega', 'devolver')

    def update(self, instance, validated_data):
        if instance.devolver == False:
            if validated_data['devolver'] == True:
                livro = Livro.objects.get(id = instance.livro.id)
                livro.quantidade += 1
                data_atual = date.today()
                instance.data_entrega = data_atual
                instance.devolver = True
                instance.save()
                livro.save()

                diferenca = abs((data_atual - validated_data['data_final']))

                if diferenca.days > 0:
                    Multa.objects.create(usuario = validated_data['usuario'], valor = diferenca.days*0.5, pagar = False)
            return instance
        else:
            raise serializers.ValidationError("Livro ja foi devolvido")


###############################################################################################################

class MultaList(serializers.HyperlinkedModelSerializer):
    usuario = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    class Meta:
        model = Multa
        fields = ('pk', 'usuario', 'valor', 'data_pagar', 'pagar', 'url')

class MultaDetail(serializers.HyperlinkedModelSerializer):
    usuario = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    class Meta:
        model = Multa
        fields = ('pk', 'usuario', 'valor', 'data_pagar', 'pagar')

    def update(self, instance, validated_data):
        if instance.pagar == False:
            if instance.pagar != validated_data['pagar']:
                instance.pagar = validated_data.get('pagar', instance.pagar)
                instance.data_pagar = date.today()
                instance.save()
        else:
            raise serializers.ValidationError("Multa ja debitada")

        return instance

            
        