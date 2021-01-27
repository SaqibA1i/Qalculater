DEL /F/Q/S "react-site/site/build/"
DEL /F/Q/S "src/main/resources/static/" 
cd react-site/site/
npm run build && cd ../../ && xcopy /s "react-site/site/build" "src/main/resources/static" && git add . && git commit -m "Test" && git push
