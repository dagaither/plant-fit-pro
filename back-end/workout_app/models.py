from django.db import models
from user_app.models import App_user
# Create your models here.

class Workout(models.Model):
    app_user = models.OneToOneField(App_user, on_delete=models.CASCADE)

class WorkoutRoutine(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name="workout_routines")
    workout_type = models.CharField(max_length=100)

class WorkoutRoutineDay(models.Model):
    workout_routine = models.ForeignKey(WorkoutRoutine, on_delete=models.CASCADE, related_name="days")
    day = models.CharField(max_length=100)

class WorkoutRoutineDayMuscle(models.Model):
    workout_routine_day = models.ForeignKey(WorkoutRoutineDay, on_delete=models.CASCADE, related_name="muscles")
    muscle = models.CharField(max_length=100)

class WorkoutRoutineDayMuscleExercise(models.Model):
    workout_routine_day_muscle = models.ForeignKey(WorkoutRoutineDayMuscle, on_delete=models.CASCADE, related_name="exercises")
    exercise = models.JSONField()