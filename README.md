video-editor
============
Навигация:
<br/>application/controllers/main.php - контроллер
<br/>application/views/video-editor.php - главный файл
<br/>-----------------/header.php - заголовок
<br/>-----------------/footer.php - футер
<br/>application/db/fileinfo.db - база данных, содержащая в себе информацию о файле
<br/>application/libraries/Mydb.php - класс работы с базой данных SQLite3
<br/>---------------------/MyDBFileInfo.php - класс работы с баззой данных fileinfo.db, наследуется от Mydb
<br/>www/videofiles/ - папка для хранения загруженых файлов
<br/>www/css/ - файлы стилей
<br/>www/js/ - скриптовые файлы
<br/>Сделано:
<br/>
<h3>Update</h3>
<br/>Добавлена БД SQLite3, которая содержит информацию о файле (полный путь к файлу, размер, mime тип, кодеки)
<br/> <strong>Структура БД fileinfo</strong>
<br/> 
<table>
   <tr>
      <td>
        <table>
          <tr><td colspan = 2><b>fileinfo</b></td></tr>
          <tr><td>file_id</td><td>integer PK</td></tr>
          <tr><td>size</td><td>integer</td></tr>
          <tr><td>path</td><td>text</td></tr>
          <tr><td>mime_id</td><td>integer FK</td></tr>
        </table>
      </td>
      <td>
        <table>
          <tr><td colspan = 2><b>mime</b></td></tr>
          <tr><td>mime_id</td><td>integer PK</td></tr>
          <tr><td>mime_type</td><td>text</td></tr>
        </table>
     </td>
     <td>
        <table>
          <tr><td colspan = 2><b>codec</b></td></tr>
          <tr><td>codec_id</td><td>integer PK</td></tr>
          <tr><td>codec</td><td>text</td></tr>
          <tr><td>mime_id</td><td>integer FK</td></tr>
        </table>
    </td>
  </tr>
</table>

<br/>Папка с исполняемыми php-файлами вынесена за пределы видимости внешнего мира.
<br/>
<hr/>
<br/>Открытие видео средствами html5
<br/>Программирование управления видео потоком средствами html5 и js
<br/> - Добавлены кнопки управления(play/pause, перемотка на 1 секунду вперед и назад, повторение видео);
<br/> - Добавлено управление звуком
<br/> - Добавлено текущее время видео и общая длина видео
<br/> - Добавлено управление видео потоком на временной шкале
<br/> - Добавлено графическое представление буферизации
<br/>Добавление видео файлов (и изображений) на сервер, пределом в 200Мб
<br/>Удаление файлов с сервера
<br/>Отображение файлов с краткой информацией в интерфейсе приложения 
<br/>Выбор фалов по левому клику мышки
<hr/>
<br/>Front-end : js, html
<br/>Back-end : php, framework CodeIgniter 
<hr/>
