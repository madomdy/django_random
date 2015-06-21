from django.db import models
import random
# Create your models here.

class Query(models.Model):
    name = models.CharField(max_length = 200)
    creation_time = models.DateTimeField()
    result_time = models.DateTimeField()
    password = models.CharField(max_length = 50)
    query_type = models.CharField(max_length = 1)
    query_text = models.CharField(max_length = 2000)
    result = models.CharField(max_length = 2000)
    def __unicode__(self):
        return 'name: {0}, type: {1}, result_time: {2}'.format(self.name, self.query_type, str(self.result_time))
    
    @staticmethod
    def implement_random(queryType, *a):
        if queryType == 'i':
            fromNumb, toNumb = a[0], a[1]
            return random.randint(fromNumb, toNumb)
        elif queryType == 's':
            strings = a[0].split('\n')
            return strings[random.randint(0, len(strings)-1)]
        elif queryType == 'r':
            fromNumb, toNumb, accuracy = a[0], a[1], a[2]
            curRand = random.uniform(fromNumb, toNumb)
            return round(curRand, accuracy)
        elif queryType == 'b':
            return 1 == random.randint(0, 1)

    @staticmethod
    def realize_random(queryType, queryText):
        queryType = queryType[-1]
        if queryType == 'i':
            fromNumb, toNumb = (int(x) for x in queryText.split())
            return random.randint(fromNumb, toNumb)
        elif queryType == 's':
            return queryText[random.randint(0, len(queryText)-1)]
        elif queryType == 'b':
            return 1 == random.randint(0, 1)
        elif queryType == 'r':
            fromNumb, toNumb, accuracy = (float(x) for x in queryText.split())
            curRand = random.uniform(fromNumb, toNumb)
            return round(curRandom, accuracy)
    
    def new_query():
        pass

    def implement_query(self, id_query):
        q = Query.objects.get(id = id_query)
        resultType = q.query_type
        return resultType

class Notification(models.Model):
    query_id = models.ForeignKey(Query)
    status = models.CharField(max_length = 3)
    time_to_send = models.DateTimeField()
    email = models.CharField(max_length = 20)
    phone = models.CharField(max_length = 20)
    def __unicode__(self):
    	return 'email: {0}, phone: {1}'.format(self.email, self.phone)

class Queue(models.Model):
    notification_id = models.OneToOneField(Notification)
    notification_time = models.DateTimeField()