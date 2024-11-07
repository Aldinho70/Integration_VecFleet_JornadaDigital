@echo off
color 0A  
cls       

echo -------------------------------------------
echo   Iniciando la secuencia de acceso...
echo -------------------------------------------
timeout /t 2 > nul  :: Espera 2 segundos

echo Conectando al servidor...
echo -------------------------------------------
timeout /t 2 > nul  :: Espera 2 segundos

:: Ejecuta tu script de Node.js
node .\index.js

:: Mensaje final
echo -------------------------------------------
echo  Ejecución completada.
echo -------------------------------------------

:: Espera indefinida (el usuario deberá cerrar la ventana manualmente)
:wait
timeout /t 5 > nul
goto wait
