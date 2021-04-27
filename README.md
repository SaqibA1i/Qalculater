# Qalculater
An app that removes my reliance on sticky notes to keep track of my academic progress

## Structure of the user metadata
The marks are stored as a JSON object in the following structure:
```json
{"Course Name":{
                "credit": *credit weight of course*}
                "data":[
                      [
                        "*assessment name*",
                        "*your percentage in assessment*",
                        "*the weight of the assessment*"
                      ],
                      *..the rest of your assessments in the same format as above*
                ]
                }
 *..the rest of your courses which follow the same format as above*
}
```
