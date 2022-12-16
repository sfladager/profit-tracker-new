from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import PermissionDenied 

User = get_user_model()

from django.conf import settings
import jwt

class JWTAuthentication(BaseAuthentication):
  def authenticate(self, request):
    #print('REQEST HEADERS ->', request.headers)

    # 1. Check if headers exist
    if not request.headers:
      return None
    # 2. Authorization Header exists
    headers = request.headers.get('Authorization')
    if not headers:
      return None
    # 3. Check that it's a Bearer token
    if not headers.startswith('Bearer '):
      raise PermissionDenied('Invalid Token')
    # 4. Remove Bearer & space from Authorization header, and save token to variable
    token = headers.replace('Bearer ', '')
    # print('TOKEN ->', token)

    try:
      # 5. Use JWT method to verify token is valid and extract payload information
      payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
      # 6. Use the sub portion of the token to query the User table to find a match
      user = User.objects.get(pk=payload['sub'])
      # print('USER ->', user.id)
    except User.DoesNotExist:
      raise PermissionDenied('User Not Found')
    except Exception as e:
      print(e)
      raise PermissionDenied(str(e))
    
    # 7. Return tuple container user and the token
    return (user, token)