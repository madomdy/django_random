from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.utils import timezone
import datetime

# Create your views here.

from .models import Query

def index(request):
    return render(request, 'randomizer/index.html', 
            {'choices': ['integer', 'string', 'real number', 'boolean']})

def parse_time(time):
    """
    year/month/date hh:mm
    """
    return [int(x) for x in time.split()[0].split('/') + time.split()[1].split(':')]

def new_query(request):
    typeChoice = request.POST.get('radio_choice')
    nameChoice = request.POST.get('query_name')
    passwordChoice = request.POST.get('query_password')
    creationTime = datetime.datetime(*parse_time(request.POST.get('creation_time')))
    if request.POST.get('radio_generation_time') == 'now':
        timeChoice = creationTime
    else:
        timeChoice = datetime.datetime(*parse_time(request.POST.get('generation_time')))
    if typeChoice == 'i':
        fromNumber, toNumber = (int(request.POST.get('integer_from_number')),
         int(request.POST.get('integer_to_number')))
        resultQuery = Query.implement_random(typeChoice, fromNumber, toNumber)
        queryText = "integer from " + str(fromNumber) + " to " + str(toNumber)
    elif typeChoice == 's':
        stringForm = request.POST.get('string_form')
        resultQuery = Query.implement_random(typeChoice, stringForm).strip()
        queryText = "\n".join(stringForm.split('\n'))
    elif typeChoice == 'r':
        fromNumber, toNumber, accur = (float(request.POST.get('real_from_number')),
            float(request.POST.get('real_to_number')), int(request.POST.get('real_accur')))
        resultQuery = Query.implement_random(typeChoice, fromNumber, toNumber, accur)
        queryText = "real from " + str(fromNumber) + " to " + str(toNumber) + " with acccuracy " + str(accur)
    elif typeChoice == 'b':
        resultQuery = Query.implement_random(typeChoice)
        queryText = "true or false"

    newQuery = Query(name = nameChoice, creation_time = creationTime, result_time = timeChoice,
     password = passwordChoice, query_type = typeChoice, query_text = queryText, 
     result = resultQuery)
    # newQuery = Query(name = "nameChoice", timezone.now(), timezone.now(), "passwordChoice", "i",
    #   "some query text", "resultQuery")
    newQuery.save()
    # return show_query(request, newQuery.id)
    # return HttpResponse(resultQuery)
    return redirect('/id' + str(newQuery.id))

def show_query(request, query_id):
    selectedQuery = Query.objects.get(pk = query_id)
    return render(request, 'randomizer/detail.html', {'object' : selectedQuery})