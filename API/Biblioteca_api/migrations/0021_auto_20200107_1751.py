# Generated by Django 3.0.1 on 2020-01-07 20:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Biblioteca_api', '0020_prateleira_quantidade'),
    ]

    operations = [
        migrations.RenameField(
            model_name='prateleira',
            old_name='quantidade',
            new_name='espaço_sobrando',
        ),
        migrations.AddField(
            model_name='livro',
            name='estante',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='livros_estantes', to='Biblioteca_api.Estante'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='livro',
            name='prateleira',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='livros_prateleiras', to='Biblioteca_api.Prateleira'),
            preserve_default=False,
        ),
    ]
