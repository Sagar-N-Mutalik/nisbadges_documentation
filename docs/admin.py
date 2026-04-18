from django.contrib import admin
from .models import SiteStat


@admin.register(SiteStat)
class SiteStatAdmin(admin.ModelAdmin):
    list_display = ('id', 'total_views')
    readonly_fields = ('total_views',)
