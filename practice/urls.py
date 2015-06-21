from django.conf.urls import url

from . import views

urlpatterns = [
        url(r'^$', views.index, name = 'index'),
        url(r'index.html', views.index, name = 'index'),
        url(r'history.html', views.show_history, name="show_history"),
        url(r'learn.html', views.show_learn, name="show_learn"),
        url(r'id(?P<query_id>[0-9]+)', views.show_query, name = 'show_query'),
        url(r'ajax_history', views.ajax_history, name = 'ajax_history'),
        url(r'new_query', views.new_query, name = 'new_query'),
]
