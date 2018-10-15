const I18n = require('react-i18nify').I18n;

I18n.setTranslations({
  en: {
      editor: {
          new_post: "Add new post",
          edit_post: "Edit post",
          featured_img: "Featured Image",
          post_title: "Post Title",
          enable_comments: "Enable Comments",
          adult_content: "Adult Content",
          in_reply_to: "In Response To Article:",
          notify_mentions: "Notify Mentions"
      },
      app: {
          delete: "Delete",
          view: "View",
          close: "Close",
          publish: "Publish",
          unpublish: "Unpublish",
          save: "Save",
          config: "Config",
          preview: "Preview",
          actions: "Actions",
          setup: "Setup",
          tags: "Tags",
          content: "Content",
          pick: "Pick",
          save_changes: "Save Changes",
          cancel: "Cancel",
          html_code: "HTML Code",
          go: "Go!",
          text_color: "Text Color",
          url: "URL",
          text: "Text",
          title: "Title",
          screen_name: "Screen Name",
          padding: "Padding:",
          margin: "Margin",
          border: "Border",
          spaces: "Spaces",
          center: "Center",
          left: "Left",
          right: "Right",
          align: "Align",
          caption: "Caption",
          type: "Type",
          description: "Description",
          library: "Library",
          rounded: "Rounded",
          circular: "Circular",
          width: "Width",
          height: "Height",
          top: "Top",
          bottom: "Bottom",
          img: "Image",
          default: "Default",
          mention: "Mention",
          gallery: "Gallery",
          media_code: "Media Code",
          retry: "Retry!",
          modal_link: {
              title_placeholder: "Description of the image. Good for SEO.",
              text_placeholder: "Text to show"
          },
          modal_tweet: {
              header: "Embed tweet",
              error_header: "The tweet introduced is not correct",
              error_p1: "Please, introduce a correct tweet.",
              placeholder: "Put the embed tweet code here or simply the link...",
          },
          modal_media:{
              header: "Insert media code",
              placeholder: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ZhE7VNE4JiM" frameborder="0" allowfullscreen></iframe>',
          },
          tag_editor:{
              placeholder: "#politics #history #sport #whatever"
          },
          modal_mention: {
              mention_color: "Mention Color",
              title: "Insert Mention"
          },
          modal_image: {
              proportions: "Proportions",
              constraint_proportions: "Constraint proportions",
              desc_placeholder: "A beatiful view of... ",
              caption_placeholder: "A nice subtitle of the picture...",
              title: "Insert Image"
          },
          modal_gallery: {
              load_images: "Load Images",
              nav_type: "Navigation Type",
              allow_fullscreen: "Allow FullScreen",
              nav_type_iphone: "Iphone",
              nav_type_thumbs: "Thumbs",
              header_new: "Insert Image Gallery",
              header_edit: "Edit Image Gallery"
          },
          modal_publish:{
              header: "Publish & Tweet",
              error_p1: "Sorry, there was an error.",
              success_header: "Congratulations!",
              success_p1: "The post was successufully published",
          },
          modal_library: {
              header: "My Library",
              select_from_lib: "Select From Library",
              upload_img: "Upload Image",
              no_pictures: "No pictures in the library",
              remove_warning_header: "You are going to remove an image.",
              remove_warning_p1: "Are you sure?",
              not_at_all: "Not at all",
              its_ok: "It\'s ok",
              upload_file: "Upload File"
          },
          modal_post_delete: {
              header : "You are going to remove a post",
              p1: "Are you sure?",
              not_sure: "Not at all",
              its_ok: "It\'s ok"
          },
          modal_unpublish: {
              header: "You are going to unpublish this post",
              p1: "If you unpublish the post this will happen:",
              li1:"The tweet where live the post will be removed",
              li2:"All replies will be deleted",
              li3:"The post will be hide from your public profile",
              h4: "Do you still want continue?"
          }
      },
      url: {
          edit_post: "/en/my-posts/edit/%{id}",
          view_post: "/en/posts/view/%{slug}/%{id}"
      }
  },
  es: {
      editor: {
          new_post: "Nuevo Artículo",
          edit_post: "Editar Artículo",
          featured_img: "Imagen Destacada",
          post_title: "Titulo del Artículo",
          enable_comments: "Habilitar comentarios",
          adult_content: "Contenido adulto",
          in_reply_to: "En respuesta al artículo:",
          notify_mentions: "Notificar alusiones"
      },
      app: {
          delete: "Eliminar",
          view: "Ver",
          close: "Cerrar",
          publish: "Publicar",
          unpublish: "Despublicar",
          save: "Salvar",
          preview: "Vista previa",
          actions: "Acciones",
          setup: "Configuración",
          config: "Configuración",
          tags: "Etiquetas",
          content: "Contenido",
          pick: "Elegir",
          save_changes: "Salvar Cambios",
          cancel: "Cancelar",
          html_code: "Código HTML",
          go: "Insertar",
          text_color: "Color del texto",
          url: "URL",
          text: "Texto",
          title: "Título",
          padding: "Relleno",
          margin: "Margen",
          border: "Borde",
          spaces: "Espacios",
          screen_name: "Referencía Usuario @",
          center: "Centrado",
          left: "Izquierda",
          right: "Derecha",
          align: "Posición",
          caption: "Subtítulo",
          type: "Tipo",
          rounded: "Redondeado",
          circular: "Circular",
          description: "Descripción",
          library: "Librería",
          width: "Ancho",
          height: "Altura",
          top: "Arriba",
          bottom: "Abajo",
          img: "Imagen",
          retry: "Reintentar",
          default: "Predeterminada",
          mention: "Mención",
          gallery: "Galería",
          media_code: "Código de Video",
          modal_link: {
              title_placeholder: "Descripción del enlace. Bueno para posicionamiento.",
              text_placeholder: "Texto a mostrar",
          },
          modal_tweet: {
              header: "Insertar Tweet",
              error_header: "El tweet introducido no es correcto.",
              error_p1: "Por favor, inttroduce un código de tweet valido.",
              placeholder: "Pon el código del tweet aqui o simplemente su enlace https://twitter.com/Tweets4Threads/status/891147780026183683"
          },
          modal_media:{
              header: "Insertar Código de Video.",
              placeholder: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ZhE7VNE4JiM" frameborder="0" allowfullscreen></iframe>',
          },
          tag_editor:{
              placeholder: "#política #historia #deportes #LoQueSea"
          },
          modal_mention: {
              mention_color: "Color del texto",
              title: "Insertar mención a usuario"
          },
          modal_image: {
              proportions: "Proporciones",
              constraint_proportions: "Mantener proporciones",
              desc_placeholder: "Una bella vista del lago... ",
              caption_placeholder: "Este lago es el más bello de Peru....",
              title: "Insertar Imagen"
          },
          modal_gallery: {
              load_images: "Cargar Imágenes",
              allow_fullscreen: "Permitir Pantalla Completa",
              nav_type: "Tipo de Menú",
              nav_type_iphone: "Iphone",
              nav_type_thumbs: "Miniaturas",
              header_new: "Insertar Galería",
              header_edit: "Editar Galería"
          },
          modal_publish:{
              header: "Publicar en Twitter",
              error_p1: "Lo sentimos, hubo un error",
              success_header: "¡Felicidades!",
              success_p1: "El artículo fue publicado correctamente.",
          },
          modal_library: {
              header: "Mi Librería",
              select_from_lib: "Seleccionar de librería",
              upload_img: "Subir imagen",
              no_pictures: "Sin imagenes en la librería",
              remove_warning_header: "Vas a eliminar una imagen",
              remove_warning_p1: "¿Estas seguro?",
              not_at_all: "No",
              its_ok: "Vamos",
              upload_file: "Subir fichero"
          },
          modal_post_delete: {
              header : "Vas a eliminar un artículo.",
              p1: "¿Estas seguro?",
              not_sure: "No del todo",
              its_ok: "Eliminar"
          },
          modal_unpublish: {
              header: "Vas a despúblicar este artículo",
              p1: "Si despublicas el artículo ocurrirá lo siguiente:",
              li1:"El tweet donde reside el artículo será eliminado.",
              li2:"Todas las respuestas serán eliminadas",
              li3:"El artículo será eliminado de tu perfil.",
              h4: "¿Desea continuar?"
          }
      },
      url: {
          edit_post: "/es/mis-articulos/editar/%{id}",
          view_post: "/es/articulos/ver/%{slug}/%{id}"
      }
  }
});
