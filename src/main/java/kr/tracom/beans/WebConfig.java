package kr.tracom.beans;

import org.apache.commons.lang3.SystemUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.view.BeanNameViewResolver;
import org.springframework.web.servlet.view.InternalResourceView;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
//import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
//import org.springframework.web.servlet.view.tiles3.TilesView;
//import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

import kr.tracom.interceptor.SessionCheckInterceptor;

@Configuration
public class WebConfig extends WebMvcConfigurationSupport {
	@Value("${spring.mvc.view.prefix}")
	private String viewPrefix;
	
	@Value("${spring.mvc.view.suffix}")
	private String viewSuffix;

	@Value("${windows.static.resource.location}")
	private String windowsStaticResouceLocation;
	
	@Value("${static.resource.location}")
	private String staticResouceLocation;

	@Value("${windows.fileupload.location2}")
	protected String windowsFileuploadLocation;
	
	@Value("${fileupload.location2}")
	protected String fileuploadLocation;

	@Value("${static.webapp.location}")
	private String staticWebappLocation;
	
	@Value("${windows.static.webapp.location}")
	private String windowsStaticWebappLocation;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		//registry.addResourceHandler("/websquare/**").addResourceLocations("/websquare/");
		if(SystemUtils.IS_OS_WINDOWS) {
			registry.addResourceHandler("/fileUpload/**").addResourceLocations(windowsFileuploadLocation);
			//registry.addResourceHandler("/cm/**").addResourceLocations(windowsStaticResouceLocation+"/static/cm/");
			//registry.addResourceHandler("/exl/**").addResourceLocations(windowsStaticResouceLocation+"/static/exl/");
			//registry.addResourceHandler("/ui/**").addResourceLocations(windowsStaticResouceLocation+"/static/ui/");
			//registry.addResourceHandler("/ClipReport/**").addResourceLocations(windowsStaticResouceLocation+"/static/ClipReport/");
			//registry.addResourceHandler("/WEB-INF/**").addResourceLocations("/WEB-INF/");
			registry.addResourceHandler("/static/**").addResourceLocations(windowsStaticWebappLocation+"/static/");;
			registry.addResourceHandler("/webjars/**").addResourceLocations("/webjars/").resourceChain(false);        
		} else {
			registry.addResourceHandler("/static/**").addResourceLocations(staticWebappLocation+"/static/");
			registry.addResourceHandler("/webjars/**").addResourceLocations("/webjars/").resourceChain(false);        
		}
		super.addResourceHandlers(registry);
	}

	@Bean
	public BeanNameViewResolver beanNameViewResolver() {
		BeanNameViewResolver beanNameViewResolver = new BeanNameViewResolver();
		beanNameViewResolver.setOrder(0);
		return beanNameViewResolver;
	}
	
	@Bean
	public InternalResourceViewResolver viewResolver() {
		InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
		internalResourceViewResolver.setViewClass(InternalResourceView.class);
		internalResourceViewResolver.setPrefix(viewPrefix);
		internalResourceViewResolver.setSuffix(viewSuffix);
		internalResourceViewResolver.setOrder(2);
		return internalResourceViewResolver;
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new SessionCheckInterceptor())
		.excludePathPatterns("/static/**")
		.excludePathPatterns("/fileupload/**")
		.excludePathPatterns("/user/login");
	}
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("*");
	}
	
	/*
	 * @Bean public TilesConfigurer tilesConfigurer() { final TilesConfigurer
	 * configurer = new TilesConfigurer(); configurer.setDefinitions(new String[] {
	 * "/WEB-INF/config/tiles/tiles.xml" }); configurer.setCheckRefresh(true);
	 * return configurer; }
	 * 
	 * @Bean public TilesViewResolver tilesViewResolver() { final TilesViewResolver
	 * tilesViewResolver = new TilesViewResolver();
	 * tilesViewResolver.setViewClass(TilesView.class);
	 * tilesViewResolver.setOrder(1); return tilesViewResolver; }
	 */
}