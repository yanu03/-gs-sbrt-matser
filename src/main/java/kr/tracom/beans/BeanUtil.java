package kr.tracom.beans;

import org.springframework.context.ApplicationContext;

public class BeanUtil {

    public static Object getBean(Class<?> classType) {
        ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
        return applicationContext.getBean(classType);
    }

    
    public static String getProperty(String propertyName) {
    	return getProperty(propertyName, null);
    }
 
    public static String getProperty(String propertyName, String defaultValue) {
        String value = defaultValue;
    	
        ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
        if(applicationContext.getEnvironment().getProperty(propertyName) == null) {
            
        } else {
            value = applicationContext.getEnvironment().getProperty(propertyName).toString();
        }
        return value;
    }
}

