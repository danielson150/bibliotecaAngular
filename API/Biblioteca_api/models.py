from django.db import models

# Create your models here.

class Genero(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.TextField()

class Livro(models.Model):
    titulo = models.TextField()
    genero = models.ForeignKey('Genero', related_name='livros', on_delete=models.CASCADE)
    autor = models.CharField(max_length=50)
    editora = models.CharField(max_length=50)
    ano_lancamento = models.CharField(max_length=4)
    quantidade = models.IntegerField()
    prateleira = models.ForeignKey("Prateleira", related_name="livros_prateleiras", on_delete=models.CASCADE)
    estante = models.ForeignKey("Estante", related_name="livros_estantes", on_delete=models.CASCADE)

class Prateleira(models.Model):
    estante = models.ForeignKey('Estante', related_name="prateleiras", on_delete=models.CASCADE)
    posicao = models.IntegerField()
    espaco_sobrando = models.IntegerField()

class Estante(models.Model):
    numero = models.IntegerField()
    genero = models.ForeignKey("Genero", related_name="estantes_genero", on_delete=models.CASCADE)
    espaco_sobrando = models.IntegerField()

class Emprestimo(models.Model):
    usuario = models.ForeignKey('auth.User', related_name='usuario_emprestimo', on_delete=models.CASCADE)
    livro = models.ForeignKey('Livro', related_name='livro_emprestimos', on_delete=models.CASCADE)
    data_inicial = models.DateField()
    data_final = models.DateField()
    data_entrega = models.DateField(null = True)
    devolver = models.BooleanField()

class Multa(models.Model):
    usuario = models.ForeignKey('auth.User', related_name='usuario_multa', on_delete=models.CASCADE)
    data_pagar = models.DateField(null = True)
    valor = models.FloatField()
    pagar = models.BooleanField()
