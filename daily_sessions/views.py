from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import SessionSerializer
from .models import Session


# Endpoint: /sessions/
class SessionView(APIView):
  # GET all sessions
  def get(self, _request):
    sessions = Session.objects.all()
    serialized_sessions = SessionSerializer(sessions, many=True)
    return Response(serialized_sessions.data)
  
  # POST new session
  def post(self, request):
    print("REQUEST USER ->", request.user)
    request.data['owner'] = request.user.id
    print("REQUEST DATA ->", request.data)
    try:
      session_to_add = SessionSerializer(data=request.data)
      if session_to_add.is_valid():
        session_to_add.save()
        return Response(session_to_add.data, status.HTTP_201_CREATED)  
      return Response(session_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)



