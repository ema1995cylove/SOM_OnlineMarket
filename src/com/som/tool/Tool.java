package com.som.tool;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Tool {
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static boolean updateUser(Object ob1, Object ob2) {
		Class clsOb1 = ob1.getClass();
		Class clsOb2 = ob2.getClass();
		Method[] methodsOb1 = clsOb1.getDeclaredMethods();
		try {
			for (int i = 0; i < methodsOb1.length; i++) {
				String methodName = methodsOb1[i].getName();
				String parName;
				methodName.substring(3);
				if (methodName.substring(0, 3).equals("set")) {
					parName = methodName.substring(3);
					Object returnValue = clsOb2.getMethod("get" + parName)
							.invoke(ob2);
					if (returnValue != null)
						methodsOb1[i].invoke(ob1, returnValue);
				}
			}
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			return false;
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return false;
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			return false;
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			return false;
		} catch (SecurityException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
