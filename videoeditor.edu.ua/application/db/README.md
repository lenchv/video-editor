<h3>Структура БД fileinfo</h3>
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
