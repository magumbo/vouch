      var CLIENT_ID = '449610478462.apps.googleusercontent.com';
      var SCOPES = 'https://www.googleapis.com/auth/drive';

      /**
       * Called when the client library is loaded to start the auth flow.
       */
      function handleClientLoad() {
        window.setTimeout(checkAuth, 1);
      }

      /**
       * Check if the current user has authorized the application.
       */
      function checkAuth() {
        gapi.auth.authorize(
            {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
            handleAuthResult);
      }

      /**
       * Called when authorization server replies.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authButton = $('#authorizeButton');
        var filePicker = $('#dropzone');
        authButton.hide();
        filePicker.hide();
        if (authResult && !authResult.error) {
          // Access token has been successfully retrieved, requests can be sent to the API.
          filePicker.show();
          //filePicker.onchange = uploadFile;
		  
		  
		  
        } else {
          // No access token could be retrieved, show the button to start the authorization flow.
          authButton.show();
          authButton.onclick = function() {
              gapi.auth.authorize(
                  {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
                  handleAuthResult);
          };
        }
      }

      /**
       * Start the file upload.
       *
       * @param {Object} evt Arguments from the file selector.
       */
      function uploadFile(file) {
        gapi.client.load('drive', 'v2', function() {
          insertFile(file);
        });
      }

      /**
       * Insert new file.
       *
       * @param {File} fileData File object to read data from.
       * @param {Function} callback Function to call when the request is complete.
       */
      function insertFile(fileData, callback) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var reader = new FileReader();
        reader.readAsBinaryString(fileData);
        reader.onload = function(e) {
          var contentType = fileData.type || 'application/octet-stream';
          var metadata = {
            'title': fileData.name,
            'mimeType': contentType
          };

          var base64Data = btoa(reader.result);
          var multipartRequestBody =
              delimiter +
              'Content-Type: application/json\r\n\r\n' +
              JSON.stringify(metadata) +
              delimiter +
              'Content-Type: ' + contentType + '\r\n' +
              'Content-Transfer-Encoding: base64\r\n' +
              '\r\n' +
              base64Data +
              close_delim;

          var request = gapi.client.request({
              'path': '/upload/drive/v2/files',
              'method': 'POST',
              'params': {'uploadType': 'multipart', 'convert': 'true'},
              'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
              },
              'body': multipartRequestBody});
          if (!callback) {
            callback = function(file) {
              console.log(file)
			  var txtURI = file.exportLinks['text/plain'];
			  
			  getTxt(txtURI);
			  
            };
          }
          request.execute(callback);
        }
      }
	  
	  
	function getTxt(txtURI){
		console.log(txtURI);
		setTimeout(function () {
	 					$.ajax({
							url : txtURI,
							dataType: "text",
							success : function (data) {
								$(".text").html(data);
							},
							error: function (jqXHR, textStatus, errorThrown) {
								// display error status on failure
								console.log(textStatus);
								console.log(jqXHR);
								console.log(errorThrown);

							},
							timeout: 2000
						});
	 		}, 5000);

	}