from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'practice.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', include('randomizer.urls', namespace = "randomizer")),
    url(r'^randomizer/', include('randomizer.urls', namespace = "randomizer")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^id', include('randomizer.urls', namespace = "randomizer")),
    url(r'^db', include('randomizer.urls', namespace = "randomizer"))
)