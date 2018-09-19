package gov.epa.stormwater.swagger;

import io.swagger.jaxrs.config.BeanConfig;
import io.swagger.util.Json;
import io.swagger.util.Yaml;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import com.fasterxml.jackson.module.jaxb.JaxbAnnotationModule;

/* UPT 2010702 Class to initialize & configure Swagger.  Used because we had to add modules for JAXB annotations (missing from
 * swagger core
 */
public class Bootstrap extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion("1.0");        
        //For local pc only 
        //beanConfig.setSchemes(new String[]{"http"});
        //For PROD 
        beanConfig.setSchemes(new String[]{"https"});
        
  
        beanConfig.setBasePath("swcalculator-server/api");
        beanConfig.setResourcePackage("gov.epa.stormwater.webservice");
        beanConfig.setTitle("Stormwater Calculator Web Services");
        beanConfig.setDescription("Stormwater Calculator Web Services REST APIs");
        beanConfig.setScan(true);
        
        //Swagger overwrote JAXB annotation parsing of Jackson so need to add these lines
        Json.mapper().registerModule(new JaxbAnnotationModule());
        Yaml.mapper().registerModule(new JaxbAnnotationModule());
    }
}