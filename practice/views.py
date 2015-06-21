from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.utils import timezone
from django.http import JsonResponse
import datetime

# Create your views here.

from .models import Query

def index(request):
    return render(request, 'practice/index.html', 
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
    return render(request, 'practice/detail.html', {'object' : selectedQuery})

def show_history(request, amountToDisplay = 20):
    objCount = Query.objects.count()
    return render(request, 'practice/history.html', {'objects' : [Query.objects.get(pk = x) for x in range(objCount, objCount - amountToDisplay - 1, -1)]})

def show_learn(request):
    return render(request, 'practice/learn.html')

def format_date_as_jinja(datetime):
    date, time = datetime.strftime("%B %d, %Y"), datetime.strftime("%I:%M%p")
    if time[0] == '0':
        time = time[1:]
    end = time[-2:].lower()
    end = end[0] + '.' + end[1] + '.'
    return date + ', ' + time[:-2] + ' ' + end

def ajax_history(request, amountToLoad = 20):
    mylast = int(request.GET['last'])
    myJSON = {}
    it = 0
    for i in range(mylast - 1, mylast - amountToLoad - 1, -1):
        if i == 0:
            break
        q = Query.objects.get(pk = i)
        myJSON[it] = {
            'id': q.id,
            'name': q.name,
            'creation_time': format_date_as_jinja(q.creation_time),
            'query_text': q.query_text,
            'result_time': format_date_as_jinja(q.result_time),
        }
        it += 1
    return JsonResponse(myJSON)
    # return JsonResponse({ 0: str(len(arg)), 1: " ".join(list(str(x) for x in arg[0].__dict__))})