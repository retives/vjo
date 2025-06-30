from django.urls import path
from accounts.views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('<uuid:user_id>/', UserView.as_view(), name='user'),
]