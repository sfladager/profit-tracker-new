from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
  # Line 8 & 9 ensure pw & pw_conf do not exist in JSON with the write_only option set to True
  password = serializers.CharField(write_only=True) 
  password_confirmation = serializers.CharField(write_only=True)

  #Validate method
  def validate(self, data):
    print('DATA ->', data)

    # Remove pw and pw_conf from JSON
    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')

    # Check if passwords match
    if password != password_confirmation:
      raise ValidationError({
        'password_confirmation': 'Does not match the password'
      })
    
    # Validate pw
    password_validation.validate_password(password)

    # Hash pw and add it back to data object
    data['password'] = make_password(password)
    return data

  class Meta:
    model = User
    fields = ('id', 'email', 'username', 'first_name', 'last_name', 'profile_image', 'password', 'password_confirmation')

