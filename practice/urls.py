from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'practice.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', include('randomizer.urls', namespace = "randomizer")),
    url(r'^randomizer', 'randomizer.views.new_query', name='new_query'),
    url(r'^admin/', include(admin.site.urls)),
)
