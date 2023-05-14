from django.core.management.base import BaseCommand
from testapp.models import User
from faker import Faker


class Command(BaseCommand):
    help = 'Inserts initial data into the database'

    def handle(self, *args, **options):
        fake = Faker()

        for _ in range(25):
            first_name = fake.first_name()
            last_name = fake.last_name()
            email = fake.email()
            role = fake.random_element(elements=('Admin', 'User'))
            department = fake.random_element(elements=('IT', 'Sales', 'HR', 'Marketing', 'Finance'))
            age = fake.random_int(min=18, max=60)
            address = fake.address()

            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                role=role,
                department=department,
                age=age,
                address=address,
            )

        self.stdout.write(self.style.SUCCESS('Initial data inserted successfully.'))
