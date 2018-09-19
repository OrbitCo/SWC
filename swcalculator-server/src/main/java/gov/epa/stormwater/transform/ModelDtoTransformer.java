package gov.epa.stormwater.transform;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service("modelDtoTransformer")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class ModelDtoTransformer implements Transformer {
	@Resource(name = "modelDtoMapper")
	private Mapper mapper;

	public ModelDtoTransformer() {

	}

	public <IOBJ, OOBJ> OOBJ transformObject(IOBJ inputObj,
			Class<OOBJ> outputObjCls) {
		if (inputObj != null) {
			return mapper.map(inputObj, outputObjCls);
		} else {
			return null;
		}
	}

}
