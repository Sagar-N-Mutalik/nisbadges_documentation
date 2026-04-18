from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import F
from .models import SiteStat
import datetime


def home(request):
    """
    Home view: counts a UNIQUE VISIT per browser session.
    - A new visitor (new session) → increments the counter.
    - The same visitor refreshing the page → does NOT increment again.
    - The same visitor coming back in a new browser session → increments again.
    Uses Django's session framework (cookie-based, no login required).
    Uses F() for atomic DB increment to avoid race conditions.
    """
    # Ensure the singleton row exists
    SiteStat.objects.update_or_create(id=1, defaults={'total_views': 0})

    # Check if this session has already been counted
    if not request.session.get('visit_counted', False):
        SiteStat.objects.filter(id=1).update(total_views=F('total_views') + 1)
        # Mark session so future refreshes don't re-count
        request.session['visit_counted'] = True
        # Persist the session (important for first-time visitors)
        request.session.modified = True

    stat = SiteStat.objects.get(id=1)

    context = {
        'total_views': stat.total_views,
        'year': datetime.datetime.now().year,
    }
    return render(request, 'docs/index.html', context)


def stats_page(request):
    """
    /stats/ — Human-readable page showing total site views.
    Read-only: does NOT increment the counter.
    """
    stat, _ = SiteStat.objects.get_or_create(id=1)
    context = {
        'total_views': stat.total_views,
        'year': datetime.datetime.now().year,
    }
    return render(request, 'docs/stats.html', context)


def stats_api(request):
    """
    /stats/api/ — Lightweight JSON endpoint for programmatic access.
    Returns: { "total_views": <int>, "timestamp": "<ISO 8601>", "session_counted": <bool> }
    Read-only: does NOT increment the counter.
    """
    stat, _ = SiteStat.objects.get_or_create(id=1)
    return JsonResponse({
        'total_views': stat.total_views,
        'session_counted': request.session.get('visit_counted', False),
        'timestamp': datetime.datetime.utcnow().isoformat() + 'Z',
    })
