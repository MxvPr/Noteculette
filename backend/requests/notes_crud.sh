#!/bin/bash

# CREATE - Créer une nouvelle note
curl -X POST http://localhost:5001/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Ma nouvelle note",
    "content": "Contenu de ma nouvelle note"
  }'

# READ - Lire toutes les notes
curl -X GET http://localhost:5001/api/notes

# READ - Lire une note par son ID (remplacer ID_DE_LA_NOTE par un ID valide)
curl -X GET http://localhost:5001/api/notes/ID_DE_LA_NOTE

# UPDATE - Mettre à jour une note (remplacer ID_DE_LA_NOTE par un ID valide)
curl -X PUT http://localhost:5001/api/notes/ID_DE_LA_NOTE \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Titre mis à jour",
    "content": "Contenu mis à jour"
  }'

# DELETE - Supprimer une note (remplacer ID_DE_LA_NOTE par un ID valide)
curl -X DELETE http://localhost:5001/api/notes/ID_DE_LA_NOTE

# DELETE ALL - Supprimer toutes les notes (script)
echo "Récupération de toutes les notes..."
NOTES=$(curl -s http://localhost:5001/api/notes)
NOTE_IDS=$(echo "$NOTES" | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)

echo "IDs récupérés: $NOTE_IDS"
COUNT=$(echo "$NOTE_IDS" | grep -v '^$' | wc -l)
echo "Suppression de $COUNT notes..."

for ID in $NOTE_IDS; do
  echo "Suppression de la note avec ID: $ID"
  curl -X DELETE http://localhost:5001/api/notes/$ID
  echo ""
done

echo "Toutes les notes ont été supprimées!"
