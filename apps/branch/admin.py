from django.contrib import admin
from apps.branch.models import Branch


class BranchAdmin(admin.ModelAdmin):
    pass

admin.site.register(Branch, BranchAdmin)