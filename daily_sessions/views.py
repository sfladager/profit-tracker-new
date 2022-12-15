from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .serializers.common import SessionSerializer
from .serializers.populated import PopulatedSessionSerializer
from .models import Session

# Authentication
from rest_framework.permissions import IsAuthenticated

# Endpoint: /sessions/
class SessionView(APIView):
  permission_classes = (IsAuthenticated, )
  # GET all sessions
  def get(self, request):
    sessions = Session.objects.filter(owner_of_session=request.user.id)
    serialized_sessions = SessionSerializer(sessions, many=True)
    return Response(serialized_sessions.data)
  
  # POST new session
  def post(self, request):
    # print("REQUEST USER ->", request.user)
    # request.data['owner'] = request.user.id
    # print("REQUEST DATA ->", request.data)
    try:
      session_to_add = SessionSerializer(data=request.data)
      if session_to_add.is_valid():
        session_to_add.save()
        return Response(session_to_add.data, status.HTTP_201_CREATED)  
      print(session_to_add.errors)
      return Response(session_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

class SessionDetailView(APIView):
  permission_classes = (IsAuthenticated, )

  #CUSTOM function to request session. 
  def get_session(self, pk):
    try:
      return Session.objects.get(pk=pk)
    except Session.DoesNotExist as e:
      print(e)
      raise NotFound(str(e))
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

    # GET session
  def get(self, request, pk):
    try:
      session = self.get_session(pk)
      # print("REQUEST SESSION ->", session.owner_of_session)
      # owner = request.data['owner']
      # print("REQUEST DATA ->", request.user)
      if session.owner_of_session != request.user:
        raise PermissionDenied('Unauthorized')
      serialized_sessions = PopulatedSessionSerializer(session)
      return Response(serialized_sessions.data)
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  # PUT Edit session
  def put(self, request, pk):
    try:
      session = self.get_session(pk)
      print("REQUEST SESSION ->", session.owner_of_session)
      # owner = request.data['owner']
      print("REQUEST DATA ->", request.data)
      if session.owner_of_session != request.user:
        raise PermissionDenied('Unauthorized')
      session_to_update = SessionSerializer(session, request.data, partial=True)
      if session_to_update.is_valid():
        session_to_update.save()
        return Response(session_to_update.data, status.HTTP_202_ACCEPTED)
      return Response(session_to_update.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  # DELETE session
  def delete(self, request, pk):
    try:
      session = self.get_session(pk)
      if session.owner_of_session != request.user:
        raise PermissionDenied('Unauthorized')
      session.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
    except Session.DoesNotExist as e:
      print(e)
      raise NotFound(str(e))

