from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
from django.shortcuts import render
from django.core.paginator import Paginator
from .models import User
from django.db.models import Q


def get_users(request):
    users = User.objects.all().order_by("first_name")
    per_page = 10
    paginator = Paginator(users, per_page)
    page_obj = paginator.get_page(1)
    context = {
        'users': page_obj,
        'total_users': users.count(),
    }
    return render(request, 'index.html', context)

def user_list(request):
    keyword = request.GET.get("keyword", "")
    sort_by = request.GET.get("sort_by", "id")
    sort_order = request.GET.get("sort_order", "desc")
    page = request.GET.get("page", 1)


    filtered_data = User.objects.filter(
    Q(first_name__icontains=keyword) |
    Q(last_name__icontains=keyword) |
    Q(email__icontains=keyword) |
    Q(department__icontains=keyword) |
    Q(role__icontains=keyword)
)
    if sort_order == 'desc':
        filtered_data = filtered_data.order_by('-' + sort_by)
    else:
        filtered_data = filtered_data.order_by(sort_by)

    paginator = Paginator(filtered_data, per_page=10)

    current_page = paginator.get_page(page)

    users = [
        {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
            "department": user.department,
            "age": user.age,
            "address": user.address,
        }
        for user in current_page
    ]

    response = {
        "users": users,
        "total_users": paginator.count,
    }

    return JsonResponse(response) 
