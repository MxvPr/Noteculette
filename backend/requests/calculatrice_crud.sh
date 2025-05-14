#!/bin/bash

# CREATE/READ - Addition
curl -X POST http://localhost:5001/api/calculatrice/addition \
  -H "Content-Type: application/json" \
  -d '{
    "a": 5,
    "b": 3
  }'

# CREATE/READ - Soustraction
curl -X POST http://localhost:5001/api/calculatrice/soustraction \
  -H "Content-Type: application/json" \
  -d '{
    "a": 10,
    "b": 4
  }'

# CREATE/READ - Multiplication
curl -X POST http://localhost:5001/api/calculatrice/multiplication \
  -H "Content-Type: application/json" \
  -d '{
    "a": 7,
    "b": 6
  }'

# CREATE/READ - Division
curl -X POST http://localhost:5001/api/calculatrice/division \
  -H "Content-Type: application/json" \
  -d '{
    "a": 20,
    "b": 4
  }'

# Note: La calculatrice n'a pas d'opérations UPDATE ou DELETE
# car elle ne stocke pas de données persistantes
