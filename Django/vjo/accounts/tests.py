from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from django.test import TestCase
from base.models import User

class UserTestCase(TestCase):

    def test_invalid_password(self):
        with self.assertRaises(ValidationError):
            User.objects.create_user(email='test1@example.com', password='1234')

    def test_duplicate_email(self):
        User.objects.create_user(email='test@example.com', password="Qw_erty132", full_name="Jane Doe")
        with self.assertRaises(IntegrityError):
            User.objects.create_user(email='test@example.com', password="Qw_erty132", full_name="John Doe")
