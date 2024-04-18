from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
import json
import requests
import random
from dotenv import dotenv_values
from .plans import two_dpw, three_dpw, four_dpw, five_dpw
from .serializers import Workout, WorkoutSerializer, WorkoutRoutine, WorkoutRoutineSerializer, WorkoutRoutineDay, WorkoutRoutineDayMuscle, WorkoutRoutineDayMuscleExercise, WorkoutRoutineDayMuscleExerciseSerializer, WorkoutRoutineTableSerializer
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

env = dotenv_values(".env")
# Create your views here.

class GenerateWorkoutPlan(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, days):
        workout_plans = {
            "two_dpw": two_dpw,
            "three_dpw": three_dpw,
            "four_dpw": four_dpw,
            "five_dpw": five_dpw,
        }

        if days in workout_plans:
            plan = workout_plans[days]
            workout_plan = self.fetch_workouts(plan)
            response = self.save_workout_plan(request, workout_plan, days)
            if response == "Workout plan already exists!":
                return Response(response, status=HTTP_400_BAD_REQUEST)
            return Response(workout_plan)
        else:
            return Response('Invalid workout plan!', status=HTTP_400_BAD_REQUEST)

    def fetch_workouts(self, plan):
        api_url = 'https://api.api-ninjas.com/v1/exercises'
        headers = {'X-Api-Key': env.get('W_API_KEY')}
        workouts = {}

        for day, muscles in plan.items():
            workouts_for_day = []
            for muscle, muscle_count in muscles.items():
                params = {'muscle': muscle, 'type': 'strength'}
                response = requests.get(api_url, params=params, headers=headers)
                json_response = response.json()
                if json_response:
                    all_workouts = json_response
                    selected_workouts = random.sample(all_workouts, muscle_count)
                    workouts_for_day.extend(selected_workouts)

            workouts[day] = workouts_for_day

        return workouts
    
    def save_workout_plan(self, request, workout_plan, plan):
        user = request.user
        workout_type_map = {
            "two_dpw": "2 Days Per Week",
            "three_dpw": "3 Days Per Week",
            "four_dpw": "4 Days Per Week",
            "five_dpw": "5 Days Per Week",
        }
        workout_type = workout_type_map.get(plan)
        workout, created = Workout.objects.get_or_create(app_user=user)
        workout_routine, created = WorkoutRoutine.objects.get_or_create(workout=workout, workout_type=workout_type)
        if not created:
            return "Workout plan already exists!"
        for day_name, exercises in workout_plan.items():
            workout_routine_day = WorkoutRoutineDay.objects.create(workout_routine=workout_routine, day=day_name)
            for exercise_data in exercises:
                muscle = exercise_data['muscle']
                workout_routine_day_muscle, created = WorkoutRoutineDayMuscle.objects.get_or_create(workout_routine_day=workout_routine_day, muscle=muscle)
                WorkoutRoutineDayMuscleExercise.objects.create(workout_routine_day_muscle=workout_routine_day_muscle, exercise=exercise_data)

class AllWorkouts(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkoutRoutineTableSerializer
    def get(self, request):
        user_workout = Workout.objects.get(app_user=self.request.user)
        user_routines = WorkoutRoutine.objects.all()
        ser_user_routines = WorkoutRoutineTableSerializer(user_routines, many=True)
        serialized_data = ser_user_routines.data
        return Response(serialized_data, status=HTTP_204_NO_CONTENT)

class AllWorkoutRoutines(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkoutSerializer
    def get(self, request):
        user_workout, _ = Workout.objects.get_or_create(app_user=self.request.user)
        ser_user_workout = WorkoutSerializer(user_workout)
        serialized_data = ser_user_workout.data
        return Response(serialized_data, status=HTTP_200_OK)

class AWorkoutRoutine(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkoutRoutineSerializer
    def get(self, request, id):
        user_workout = Workout.objects.get(app_user=self.request.user)
        # user_routines = WorkoutRoutine.objects.get(id=id)
        user_routines = get_object_or_404(WorkoutRoutine, id=id)
        ser_user_workout = WorkoutRoutineSerializer(user_routines)
        serialized_data = ser_user_workout.data
        if serialized_data:
            return Response(serialized_data, status=HTTP_200_OK)
        else:
            return Response("No workout routine by that ID", status=HTTP_204_NO_CONTENT)

    def delete(self, request, id):
        user_workout = Workout.objects.get(app_user=self.request.user)
        user_routine = get_object_or_404(WorkoutRoutine, id=id)
        user_routine.delete()
        return Response("Workout routine deleted!", status=HTTP_200_OK)


class Muscle(APIView):
    def get(self, request, muscle):
        # api_url = 'https://api.api-ninjas.com/v1/exercises?muscle={}'.format(muscle)
        api_url = 'https://api.api-ninjas.com/v1/exercises'
        params = {'muscle': muscle, 'type': 'strength'}
        headers = {'X-Api-Key': env.get("W_API_KEY")}
        response = requests.get(api_url, params=params, headers=headers)
        json_response = response.json()
        return Response(json_response)

class AMuscle(APIView):
    def get(self, request, muscle):
        # api_url = 'https://api.api-ninjas.com/v1/exercises?muscle={}'.format(muscle)
        api_url = 'https://api.api-ninjas.com/v1/exercises'
        params = {'muscle': muscle, 'type': 'strength'}
        headers = {'X-Api-Key': env.get("W_API_KEY")}
        response = requests.get(api_url, params=params, headers=headers)
        json_response = response.json()
        random_exercise = random.choice(json_response)
        r_e = random_exercise
        formatted = {'name': r_e['name'], 'type': r_e['type'], 'instructions': r_e['instructions']}
        return Response(formatted)


class GenerateCardio(APIView):
    def get(self, request):
        api_url = 'https://api.api-ninjas.com/v1/exercises'
        params = {'type': 'cardio'}
        headers = {'X-Api-Key': env.get("W_API_KEY")}
        workout = []
        response = requests.get(api_url, params=params, headers=headers)
        json_response = response.json()
        random_exercise = random.choice(json_response)
        r_e = random_exercise
        formatted = {'name': r_e['name'], 'type': r_e['type'], 'instructions': r_e['instructions']}
        return Response(formatted)

    
class AnExercise(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkoutRoutineDayMuscleExerciseSerializer
    def get(self, request, id):
        exercise = get_object_or_404(WorkoutRoutineDayMuscleExercise, id=id)
        muscle = exercise.exercise.get('muscle') 
        response = AMuscle.get(self, request, muscle) 
        if response.status_code == HTTP_200_OK:
            new_exercise_data = response.data
            exercise.exercise['name'] = new_exercise_data['name']
            exercise.exercise['instructions'] = new_exercise_data['instructions']
            exercise.save()
            serialized_data = self.serializer_class(exercise).data
            return Response(serialized_data, status=HTTP_200_OK)
        else:
            return Response("Error generating exercise", status=response.status_code)
        
