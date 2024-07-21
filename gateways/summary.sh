#!/bin/bash

# Find result files
result_files=$(ls results_*.txt)

# Initialize summary variable
summary=""

# Process each result file
for filepath in $result_files; do
  # Extract gateway name from filename
  gateway=$(echo $filepath | cut -d'_' -f2 | cut -d'.' -f1)

  # Read the file content
  content=$(cat "$filepath")
  lines=$(echo "$content" | tr '\n' ' ')

  # Initialize success and failure counters
  success=0
  failure=0

  # Process each line in the file content
  while IFS= read -r line; do
    if [[ $line =~ ^[\.\X]+$ ]]; then
      for (( i=0; i<${#line}; i++ )); do
        char=${line:$i:1}
        if [[ $char == '.' ]]; then
          success=$((success + 1))
        elif [[ $char == 'X' ]]; then
          failure=$((failure + 1))
        fi
      done
    fi
  done <<< "$content"

  # Calculate success rate in percentage and round to nearest integer
  total=$((success + failure))
  if [[ $total -ne 0 ]]; then
    rate=$(( (100 * success + total / 2) / total ))
  else
    rate=0
  fi

  # Append to the summary string
  summary+="$gateway: $rate% $success/$total"$'\n'
done

# Write summary to summary.txt
echo -e "$summary" > summary.txt
