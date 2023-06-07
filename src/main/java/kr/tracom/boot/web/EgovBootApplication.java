package kr.tracom.boot.web;

import javax.faces.application.Application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
//@Import(EgovBootInitialization.class)
@ComponentScan(basePackages="kr.tracom")
public class EgovBootApplication extends SpringBootServletInitializer{


	/*
	 * @Override protected SpringApplicationBuilder
	 * configure(SpringApplicationBuilder application) { return
	 * application.sources(Application.class); }
	 */
	 
	
	public static void main(String[] args) {
        SpringApplication application = new SpringApplication(EgovBootApplication.class);
        application.addListeners(new ApplicationPidFileWriter());
        application.run(args);
	}

}
