<?php
// enviar.php - Configurado para Ansacar.es

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. RECOGIDA DE DATOS
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $email_cliente = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $telefono = htmlspecialchars(trim($_POST['telefono']));
    $mensaje = htmlspecialchars(trim($_POST['mensaje']));

    // Verificación del checkbox de privacidad
    if (!isset($_POST['privacidad'])) {
        die("Error: Debes aceptar la política de privacidad para enviar el mensaje.");
    }

    // 2. CONFIGURACIÓN DEL CORREO
    // Aquí es donde te llegarán los mensajes
    $destinatario = "samuel@ansacar.es";

    $asunto = "Nuevo contacto web: $nombre";

    // 3. CUERPO DEL MENSAJE
    $contenido = "Has recibido una nueva solicitud desde la web ansacar.es:\n\n";
    $contenido .= "----------------------------------\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Email:  $email_cliente\n";
    $contenido .= "Tlf:    $telefono\n";
    $contenido .= "----------------------------------\n\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    // 4. CABECERAS (CRÍTICO PARA IONOS)
    // El 'From' DEBE ser de tu dominio (@ansacar.es) para que funcione.
    // Usamos 'no-reply' o 'web' como remitente técnico.
    $headers = "From: web@ansacar.es\r\n";

    // Al dar a 'Responder' en tu correo, responderás al cliente, no a la web.
    $headers .= "Reply-To: $email_cliente\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    $headers .= "Content-Type: text/plain; charset=UTF-8"; // Para que se vean bien las tildes

    // 5. ENVIAR Y REDIRIGIR
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        // Éxito: vuelve a la web y muestra un aviso (simple)
        echo "<script>
                alert('Gracias. Su mensaje se ha enviado correctamente.');
                window.location.href='index.html';
              </script>";
    } else {
        // Error
        echo "<script>
                alert('Error al enviar. Por favor, llámenos directamente o inténtelo más tarde.');
                window.history.back();
              </script>";
    }

} else {
    // Si entran directamente al archivo sin formulario
    header("Location: index.html");
    exit();
}
?>