# Image Blender

Refactor my application to improve, harden and modernize the code. Aim for:

- Simplicity (less is more!)
- Maintainability
- Performance

Things that were improved:

* simplicity - use async/await instead of callbacks, avoid callback hell  
* maintainability - extract functions, e.g. for blending, creating requests   
* performance - send two requests at once rather then one after the other  

Additional things that could be improved with more time:

* add unit and component tests
* modularize the code to separate concerns