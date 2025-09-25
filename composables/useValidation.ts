/**
 * Form validation composable with comprehensive validation rules
 */

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
  message?: string
}

export interface ValidationSchema {
  [key: string]: ValidationRule
}

export interface ValidationErrors {
  [key: string]: string[]
}

export const useValidation = () => {
  const errors = ref<ValidationErrors>({})
  const isValid = ref(true)

  // Common validation patterns
  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    url: /^https?:\/\/.+/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    noSpecialChars: /^[a-zA-Z0-9\s]+$/
  }

  // Common validation rules
  const rules = {
    required: (message = 'This field is required') => ({
      required: true,
      message
    }),
    
    email: (message = 'Please enter a valid email address') => ({
      pattern: patterns.email,
      message
    }),
    
    minLength: (min: number, message?: string) => ({
      minLength: min,
      message: message || `Must be at least ${min} characters long`
    }),
    
    maxLength: (max: number, message?: string) => ({
      maxLength: max,
      message: message || `Must be no more than ${max} characters long`
    }),
    
    phone: (message = 'Please enter a valid phone number') => ({
      pattern: patterns.phone,
      message
    }),
    
    url: (message = 'Please enter a valid URL') => ({
      pattern: patterns.url,
      message
    }),
    
    password: (message = 'Password must be at least 8 characters with uppercase, lowercase, and number') => ({
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message
    })
  }

  const validateField = (value: any, fieldRules: ValidationRule): string[] => {
    const fieldErrors: string[] = []

    // Required validation
    if (fieldRules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      fieldErrors.push(fieldRules.message || 'This field is required')
      return fieldErrors
    }

    // Skip other validations if field is empty and not required
    if (!value || (typeof value === 'string' && !value.trim())) {
      return fieldErrors
    }

    // Length validations
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      fieldErrors.push(fieldRules.message || `Must be at least ${fieldRules.minLength} characters long`)
    }

    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      fieldErrors.push(fieldRules.message || `Must be no more than ${fieldRules.maxLength} characters long`)
    }

    // Pattern validation
    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      fieldErrors.push(fieldRules.message || 'Invalid format')
    }

    // Custom validation
    if (fieldRules.custom) {
      const customResult = fieldRules.custom(value)
      if (customResult !== true) {
        fieldErrors.push(typeof customResult === 'string' ? customResult : 'Invalid value')
      }
    }

    return fieldErrors
  }

  const validate = (data: Record<string, any>, schema: ValidationSchema): boolean => {
    const newErrors: ValidationErrors = {}
    let hasErrors = false

    // Validate each field according to schema
    Object.keys(schema).forEach(field => {
      const fieldErrors = validateField(data[field], schema[field])
      if (fieldErrors.length > 0) {
        newErrors[field] = fieldErrors
        hasErrors = true
      }
    })

    errors.value = newErrors
    isValid.value = !hasErrors

    return !hasErrors
  }

  const validateSingle = (field: string, value: any, fieldRules: ValidationRule): boolean => {
    const fieldErrors = validateField(value, fieldRules)
    
    if (fieldErrors.length > 0) {
      errors.value = { ...errors.value, [field]: fieldErrors }
      isValid.value = false
      return false
    } else {
      // Remove field from errors if it's now valid
      const newErrors = { ...errors.value }
      delete newErrors[field]
      errors.value = newErrors
      isValid.value = Object.keys(newErrors).length === 0
      return true
    }
  }

  const clearErrors = (field?: string) => {
    if (field) {
      const newErrors = { ...errors.value }
      delete newErrors[field]
      errors.value = newErrors
    } else {
      errors.value = {}
    }
    isValid.value = Object.keys(errors.value).length === 0
  }

  const getFieldError = (field: string): string | null => {
    return errors.value[field]?.[0] || null
  }

  const hasFieldError = (field: string): boolean => {
    return !!(errors.value[field] && errors.value[field].length > 0)
  }

  return {
    errors: readonly(errors),
    isValid: readonly(isValid),
    rules,
    patterns,
    validate,
    validateSingle,
    clearErrors,
    getFieldError,
    hasFieldError
  }
}
