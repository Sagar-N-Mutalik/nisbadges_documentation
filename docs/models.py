from django.db import models


class SiteStat(models.Model):
    """Singleton model that tracks total page views for the site."""
    total_views = models.PositiveBigIntegerField(default=0)

    class Meta:
        verbose_name = "Site Statistic"
        verbose_name_plural = "Site Statistics"

    def __str__(self):
        return f"Total Views: {self.total_views:,}"
