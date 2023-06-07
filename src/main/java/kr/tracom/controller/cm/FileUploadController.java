package kr.tracom.controller.cm;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.tracom.beans.SyFileM;


@Controller
// @CrossOrigin(origins = "http://localhost:8082") open for specific port
// @CrossOrigin() // open for all ports
public class FileUploadController {

    private static final Logger logger     = LoggerFactory.getLogger(FileUploadController.class);
    private static final String folderPath = "c:/temp/upload/";

    @GetMapping("/upload.do")
    public String upload() {
        return "fileupload";
    }

    /**
     * Multi 파일 업로드
     *
     * @param  file[]
     * @return
     */
    @PostMapping(value = "/upload", produces = "application/json; charset=utf8")
    public @ResponseBody ResponseEntity<?> uploadFile(@RequestParam("files") MultipartFile[] multiFiles, Model model) {
        Map<String, Object> result = new HashMap<>();

        try {
            createDirIfNotExist();

            SyFileM syFileM = null;
            String  uuId, fileId, orgnFileName, pyscFileName, physicalPath;

            List<SyFileM> fileList = new ArrayList<>();
            for (int i = 0; i < multiFiles.length; i++) {
                if (!multiFiles[i].isEmpty()) {
                    // byte[] bytes = multiFiles[i].getBytes();

                    logger.debug("folderPath :: {}", folderPath);
                    logger.debug("file.getOriginalFilename() :: {}", multiFiles[i].getOriginalFilename());
                    logger.debug("file size :: {}", multiFiles[i].getSize());

                    uuId         = UUID.randomUUID().toString();
                    fileId       = getToDate() + "_" + uuId;
                    orgnFileName = multiFiles[i].getOriginalFilename();
                    pyscFileName = uuId;
                    physicalPath = folderPath + getToDate() + "/";

                    syFileM = new SyFileM(fileId, orgnFileName, pyscFileName, multiFiles[i].getSize());
                    fileList.add(syFileM);

                    // 파일에 저장하기
                    logger.debug("dest :: {}", physicalPath + pyscFileName);
                    File dest = new File(physicalPath + pyscFileName);
                    multiFiles[i].transferTo(dest);
                }
            }

            result.put("success", true);
            result.put("fileList", fileList);

        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }

        logger.debug("result :: {}", result);

        return ResponseEntity.ok().body(result);
    }

    /**
     * Create directory to save files, if not exist
     */
    private void createDirIfNotExist() {
        // create directory to save the files
        File directory = new File(folderPath + "/" + getToDate());
        if (!directory.exists()) {
            directory.mkdir();
        }
    }

    /**
     * Method to get the list of files from the file storage folder.
     *
     * @return file
     */
    @GetMapping("/files")
    public ResponseEntity<String[]> getListFiles() {
        return ResponseEntity.status(HttpStatus.OK).body(new java.io.File(folderPath).list());
    }

    private String getToDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        Date             date      = new Date(System.currentTimeMillis());

        return formatter.format(date);
    }
}
