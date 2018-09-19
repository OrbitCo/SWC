package gov.epa.stormwater.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;


@Component
public class RestAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request,
			final HttpServletResponse response,
			final AuthenticationException authException
			) throws IOException,
			ServletException {
		
		//4dbug System.out.println("SPRING SECURITY FILTER REACHED when not authorized!!!");
		
		response.addHeader("WWW-Authenticate", "Basic realm=\""
				+ getRealmName() + "\"");
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		final PrintWriter writer = response.getWriter();
		writer.println("HTTP Status " + HttpServletResponse.SC_UNAUTHORIZED + " Unauthorized"
				+ " - EPA Stormwater Calculator: " + authException.getMessage());
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		setRealmName("EPA Stormwater Calculator");
		super.afterPropertiesSet();
	}


	
}

/*
 * //@Component( "restAuthenticationEntryPoint" ) public class
 * RestAuthenticationEntryPoint implements AuthenticationEntryPoint{
 * 
 * @Override public void commence( HttpServletRequest request,
 * HttpServletResponse response, AuthenticationException authException ) throws
 * IOException{ response.sendError( HttpServletResponse.SC_UNAUTHORIZED, "W" );
 * } }
 */
